import slugify from 'slugify';

export const createSlug = (text: string)=>{
	return slugify(text + '-' + Date.now(), { lower: true })
}