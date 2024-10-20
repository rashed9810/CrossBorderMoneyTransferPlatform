
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


const accessToken = Cookies.get('accessToken');

export const decodedUser = accessToken ? jwtDecode(accessToken as string) : '';

