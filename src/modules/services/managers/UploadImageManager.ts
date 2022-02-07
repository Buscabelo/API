import { inject, injectable } from 'tsyringe';

import Image from '../infra/typeorm/entities/Image';
import IImageRepository from '../repositories/IImageRepository';
import IServiceRepository from '../repositories/iServiceRepository';
import IStorageProvider from '@shared/containers/providers/StorageProvider/models/IStorageProvider';
import Service from '../infra/typeorm/entities/Service';

interface IImage{
  service: Service,
  url: string | undefined,
}

@injectable()
export default class UpdateImageManager {
  constructor(
    @inject('ServiceRepository')
    private serviceRepository: IServiceRepository,
    @inject('ImageRepository')
    private imageRepository: IImageRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute(newImage:IImage): Promise<Image>{
    const service = await this.serviceRepository.findById(newImage.service.id);
    if (!service){
      throw new Error('Service not found');
    }

    const fileName = await this.storageProvider.saveFile(newImage.url!);
    newImage.url =  `https://buscabelo-cdn.s3.amazonaws.com/${fileName}`
    const image = this.imageRepository.create(newImage);
    return image;
  }
}
