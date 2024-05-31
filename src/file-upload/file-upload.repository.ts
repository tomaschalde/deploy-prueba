import { Injectable } from "@nestjs/common"
import * as toStream from "buffer-to-stream";
import { UploadApiResponse, v2 as cloudinary} from "cloudinary"

@Injectable()
export class FileUploadRepository {
    async uploadImage(file : Express.Multer.File) : Promise<UploadApiResponse> {

        return new Promise((resolve, reject)  => {
            const upload = cloudinary.uploader.upload_stream(
                {resource_type: 'auto'},
                (error, result) => {
                    if(error){
                        reject (error)
                    } else {
                        resolve(result)
                    }
                }
            )
            toStream(file.buffer).pipe(upload)
        });

    }
}