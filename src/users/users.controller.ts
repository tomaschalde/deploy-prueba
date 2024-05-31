import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, Req, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { UpdateUserDto } from "src/dtos/updateUser.dto";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Role } from "src/roles/role.enum";
import { Roles } from "src/decorators/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    //Gets
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page : string , @Query('limit') limit : string, @Req() request : Request & {user : any} ){
        console.log(request.user)
        
        if(!page && !limit) return this.userService.getUsers(1,5)

        return this.userService.getUsers(Number(page), Number(limit));

    }

    @ApiBearerAuth()
    @Get(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUserById(@Param('id', ParseUUIDPipe) id : string, @Req() request : Request & {user : any} ){
        console.log(request.user)
        return this.userService.getUserById(id)
    }

    //Puts
    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id : string, @Body() user : UpdateUserDto, @Req() request : Request & {user : any} ){
        console.log(request.user)
        return this.userService.updateUser(id,user);        
    }

    //Delete
    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id : string, @Req() request : Request & {user : any} ){
        console.log(request.user)
        return this.userService.deleteUser(id)
    }

}
