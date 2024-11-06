import { ActionCallbackWithData, ServerError } from 'utils/types';
import { UserResponse, UsersService } from 'backend';
import { showError } from '../../../utils/notifications';

export const loadUserProfile = (token: string, userId: number, onFinish: ActionCallbackWithData<UserResponse>) => {
  UsersService.getUser({
    userId
  }, { headers: { Authorization: token } })
    .then((userProfile: UserResponse) => {
      onFinish(true, userProfile);
    })
    .catch((e: ServerError) => {
      showError('Не удалось загрузить профиль пользователя', e);
      onFinish(false);
    });
};
