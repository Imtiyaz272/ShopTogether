import { HttpClient } from '@angular/common/http';
import { ApplicationRef, inject, Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

    private socket: Socket;
    private http = inject(HttpClient);
  constructor() {
    this.socket = io('http://localhost:3000', { autoConnect: false });
    inject(ApplicationRef).isStable.pipe(
      first((isStable) => isStable))
    .subscribe(() => { this.socket.connect() });

  this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
  });
   }

   sendMessage(chatId:string, senderId:string,message:string):void{
      this.socket.emit('user-message', {chatId,senderId,message});
   }

   onMessage():Observable<any>{
     return new Observable(observer => {
      this.socket.on('recieved-message',  (data: { sender: string, message: string })=>{
        console.log('Message received:', data.message); 
        observer.next(data);
      })
     })
   }

   joinChat(chatId:string):void{
    this.socket.emit('join-chat', chatId);
   }

   getMessages(chatId:string){
      return this.http.get<Chat>(`${apiUrls.chatServiceApi}getChat/${chatId}`);
   }
}


export type Chat = {
  _id:string,
   users:string[],
   messages: {
   sender: string,
   message: string
   }[];
  }

