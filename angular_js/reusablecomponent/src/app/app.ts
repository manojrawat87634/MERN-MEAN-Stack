import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FriendCard } from '../component/friend-card/friend-card';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FriendCard], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  suggestedFriends = [
    { name: 'Alice Johnson', username: 'alice_j', profilePic: 'https://i.pravatar.cc/50?img=1', isFollowing: false },
    { name: 'Bob Smith', username: 'bob_smith', profilePic: 'https://i.pravatar.cc/50?img=2', isFollowing: false },
    { name: 'Charlie Lee', username: 'charlie_l', profilePic: 'https://i.pravatar.cc/50?img=3', isFollowing: true },
  ];

  handleFollow(username: string, isFollowing: boolean) {
    console.log(`${username} is now ${isFollowing ? 'followed' : 'unfollowed'}`);
  }

  protected readonly title = signal('reusablecomponent');
}
