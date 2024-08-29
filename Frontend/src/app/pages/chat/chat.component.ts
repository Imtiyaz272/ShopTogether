import { CommonModule } from '@angular/common';
import {NgZone, AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export default class ChatComponent implements OnInit, AfterViewChecked{

    fb = inject(FormBuilder);
    messages:{sender:string, message:string}[] = [];
    chatForm!: FormGroup;
    chatId: string ="66c9a38da2b4c88f1b8fc7db";
    socketService = inject(SocketService);
    senderId : string | null = null;
    ngZone = inject(NgZone);
    @ViewChild('messageContainer') private messageContainer!: ElementRef;
    
    ngOnInit(): void {
       
        this.chatForm = this.fb.group({
          message:['']
        });
        if (typeof window !== 'undefined' && window.localStorage) {
          this.senderId = localStorage.getItem('user_id');
      }
        this.socketService.joinChat(this.chatId);
        this.socketService.onMessage().subscribe((data:any) => {
          // this.messages.push(message);
          this.ngZone.run(() => {
            this.messages.push(data);
          })
        });

        this.getMessages();
    }

    ngAfterViewChecked(){
        this.scrollToBottom();
    }

    getMessages(){
        this.socketService.getMessages(this.chatId).subscribe({
          next:(data) => {
              this.messages = data.messages.map((m: {sender:string, message: string; }) =>
               ({ 
                sender: m.sender,
                message: m.message
          }));
    }})
    }

    sendMessage():void{
      if (typeof window !== 'undefined' && window.localStorage) {
        this.senderId = localStorage.getItem('user_id');
        console.log(`senderID: ${this.senderId}`);
       }
      const message = this.chatForm.get('message')?.value;
      if(message){
        if(this.senderId)
        {
        this.messages.push({sender:this.senderId,message}); 
        this.socketService.sendMessage(this.chatId,this.senderId, message);
        this.chatForm.reset();
        }
      }
      else{
        console.log("Message is needed to send");
      }
    }

    private scrollToBottom(): void {
      try {
          this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      } catch (err) {
          console.error('Error scrolling to bottom', err);
      }
  }
}
