import { IsNotEmpty} from 'class-validator';
import { FIELD_MUST_BY_NOT_EMPTY} from '../../exeptions-consts';



export class UserAddRoleDto{
	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY })
	roles: string[];
}

