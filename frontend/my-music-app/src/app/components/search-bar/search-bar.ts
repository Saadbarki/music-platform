import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchQuery: string = '';
  
  onSearch() {
    // This is where we'll add search functionality later
    console.log('Searching for:', this.searchQuery);
  }
  
  clearSearch() {
    this.searchQuery = '';
  }
}
