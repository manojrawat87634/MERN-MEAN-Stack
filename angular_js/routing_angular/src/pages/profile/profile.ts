import { Component } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLinkActive],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
 constructor(private route : ActivatedRoute){}
 ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  console.log(id);
}
}
