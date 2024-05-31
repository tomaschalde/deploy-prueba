import { Controller, FileTypeValidator, FileValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FileValidatorPipe } from './fileValidator';

@ApiTags('Files')
@Controller('files')
export class FileUploadController {

    constructor(private readonly fileUploadService : FileUploadService) {}

    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @Post('uploadimage/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    @UsePipes(FileValidatorPipe)
    uploadImage(
                @Param('id', ParseUUIDPipe) productId : string, 
                @UploadedFile(
                    new ParseFilePipe({
                        
                        validators: [
                            new FileTypeValidator({fileType: /(jpg|jpeg|png|webp|gif|svg)/}),

                            new MaxFileSizeValidator({
                                maxSize: 200000,
                                message: 'Archivo superior a 200kb'
                            })
                        ]
                    })
                ) file : Express.Multer.File
               )
    {
        return this.fileUploadService.uploadImage(productId,file)
    }

}
