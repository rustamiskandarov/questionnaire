import { IsNotEmpty} from 'class-validator';
import { FIELD_MUST_BY_NOT_EMPTY} from 'src/exeptions-consts';
import { RoleEntity } from 'src/role/role.entity';


export class UserAddRoleDto{
	@IsNotEmpty({ message: FIELD_MUST_BY_NOT_EMPTY })
	roles: string[];
}

