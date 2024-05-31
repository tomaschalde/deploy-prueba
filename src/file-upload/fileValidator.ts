import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value) throw new BadRequestException('Debe enviar una imagen')

        return value
    }
}