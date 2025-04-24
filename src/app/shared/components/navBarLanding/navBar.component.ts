import { Component, HostListener, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navBar.component.html',
})
export class NavBarComponent {
  // State for mobile menu
  isMobileMenuOpen = signal(false);

  // Navigation bar links configuration
  navBarData = [
    {
      name: 'INICIO',
      url: '/'
    },
    {
      name: 'FAQ',
      url: '/faq'
    },
    {
      name: 'CONTACTO',
      url: '/contacto'
    },
    {
      name: 'GFA',
      url: '/main'
    }
  ];

  // Toggle mobile menu state
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(current => !current);
  }

  // Close mobile menu when clicking on a link or when resizing to desktop
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  // Listen for window resize events to close mobile menu when switching to desktop
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth >= 768) { // md breakpoint
      this.closeMobileMenu();
    }
  }
}
