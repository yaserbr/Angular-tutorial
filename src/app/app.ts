import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Singleton } from './singleton/singleton';

@Component({
  selector: 'app-root',
  imports: [Navbar, Singleton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
