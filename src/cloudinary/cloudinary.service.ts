import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary-response';
import { v2 as cloudinary } from 'cloudinary';

const streamifier = require('streamifier')

@Injectable()
export class CloudinaryService {

    async uploadFile( file: Express.Multer.File ): Promise<CloudinaryResponse> {

        return new Promise<CloudinaryResponse>(( res, req ) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                ( err, result ) => {
                    if ( err ) return req(err)
                    res(result)
                }
            )

            streamifier.createReadStream(file.buffer).pipe(uploadStream)

        })
    }

}
