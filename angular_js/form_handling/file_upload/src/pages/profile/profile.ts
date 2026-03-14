import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  selectedFile!: File;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post("http://localhost:8080/api/file", formData)
      .subscribe(res => {
        console.log(res);
      });
  }
}