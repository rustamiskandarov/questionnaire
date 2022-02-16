import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';
import { TagEntity } from './tag.entity';
import slugify from 'slugify';
import { createSlug } from '../utils/create-slug';
import { ValidationException } from '../exceptions/validation.exception';
import { NAME_IS_BUSY_ERROR } from '../exeptions-consts';

@Injectable()
export class TagService {
	constructor(@InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>){}

	async saveTag(tagDto: TagDto): Promise<TagEntity>{
		if(await this.findOneByName(tagDto.name)){
			throw new ValidationException({ name: NAME_IS_BUSY_ERROR});
		}
		const newTag = new TagEntity();
		Object.assign(newTag, tagDto);
		newTag.slug = createSlug(newTag.name);
		return await this.tagRepository.save(newTag);
	}

	async findAll(){
		return await this.tagRepository.find();
	}
	async findOneByName(name: string):Promise<TagEntity>{
		return await this.tagRepository.findOne({name});
	}

	async deleteOneBySlug(slug: string):Promise<DeleteResult>
	{
		return await this.tagRepository.delete({slug});
	}


}

