import { io } from 'socket.io-client';
import { baseUrl } from '@/constants/constant';

export const socket = io(baseUrl, {
  transports: ['websocket'],
  autoConnect: false,
});
