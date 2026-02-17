import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  PLATFORM_ID,
  Renderer2,
  signal,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../core/auth/Services/Authentication/auth.service';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input({ required: true }) isLogged!: boolean;

  count: Signal<number> = computed(() => this.cartService.cartCount());
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly plat_id = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.count = this.cartService.cartCount;
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(STORED_KEYS.userToken);
      if (token) {
        this.getAllCartdata();
      }
    }
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  signOut(): void {
    this.authService.userLogOut();
  }

  getAllCartdata(): void {
    this.cartService.getloggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }

  private readonly translateService = inject(TranslateService);
  private readonly renderer = inject(Renderer2);

  isOpen = signal(false);

  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'Arabic' },
  ];

  selectedLanguage: Language = { code: this.translateService.getCurrentLang(), name: 'English' };
  toggleDropdown(): void {
    this.isOpen.update((value) => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectLanguage(language: Language): void {
    this.selectedLanguage = language;
    this.closeDropdown();

    this.translateService.use(language.code);
    this.renderer.setAttribute(document.documentElement, 'lang', language.code);
    this.renderer.setAttribute(
      document.documentElement,
      'dir',
      language.code === 'en' || language.code === 'de' ? 'ltr' : 'rtl',
    );
    console.log('Selected language:', language.code);
  }
}
