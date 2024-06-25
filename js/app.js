import { ProductCard } from './ProductCard.js';

class App {
  constructor() {
    this.URL =
      'https://www.greatfrontend.com/api/projects/challenges/e-commerce/products';
    this.$appContainer = document.getElementById('app-container');
    this.paginationSize = 8;
  }

  async initialize() {
    const response = await this.fetchProducts();
    const products = response.data.map((el, index) => {
      return new ProductCard(el, index).render();
    });

    const $headerContainer = document.createElement('section');
    const $headerTitle = document.createElement('span');
    const $viewAllBtn = document.createElement('button');
    const $productsContainer = document.createElement('section');

    $headerContainer.className = 'header-container';
    $headerTitle.className = 'header-container__header-title';
    $viewAllBtn.className = 'header-container__view-all-btn';
    $productsContainer.className = 'products-container';

    $headerTitle.textContent = 'Latest Arrivals';
    $viewAllBtn.textContent = 'View all';
    $viewAllBtn.className = 'header-container__view-all-btn';

    $headerContainer.append($headerTitle, $viewAllBtn);
    $productsContainer.append(...products.slice(0, this.paginationSize));
    this.$appContainer.append($headerContainer, $productsContainer);
  }

  async fetchProducts() {
    try {
      const response = await fetch(this.URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log({ error });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const productSectionApp = new App();
  productSectionApp.initialize();
});
