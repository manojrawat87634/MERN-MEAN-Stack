import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface UserData {
  name: string;
  username: string;
  profilePic: string;
  isFollowing?: boolean;
}

@Component({
  selector: 'app-friend-card',
  imports: [NgClass, CommonModule],
  standalone : true,
  templateUrl: './friend-card.html',
  styleUrl: './friend-card.css',
})
export class FriendCard {
  @Input() data! : UserData;
  @Output() followToggled = new EventEmitter<boolean> ();
  toggleFollow(){
    this.data.isFollowing = !this.data.isFollowing;
    this.followToggled.emit(this.data.isFollowing);
  }
}
