import { COLOR_VALUES } from './utils.js';

export class ProductCard {
  constructor(data, index) {
    this.data = data;
    this.imgId = `product-card-${index}`;
    this.colorOptions = {};
    this.selectedColor = null;
  }

  setInitialColors(images) {
    images.forEach(({ color, image_url }) => {
      if (!this.colorOptions.hasOwnProperty(color)) {
        this.colorOptions[color] = image_url;
      }
    });
  }

  formatUpperCase(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  updateSelection(imgId, newColor) {
    this.updateCurrentColor(newColor);
    const curImg = document.getElementById(imgId);
    curImg.src = this.colorOptions[newColor];
  }

  updateCurrentColor(newColor) {
    const curColor = document.getElementById(this.selectedColor.id);
    curColor.textContent = this.formatUpperCase(newColor);
  }

  render() {
    const { product_id, name, colors, images, inventory } = this.data;

    this.setInitialColors(images);

    if (this.selectedColor === null) {
      const colorObj = {};
      colorObj.id = `${this.imgId}-color`;
      colorObj.color = colors[0];
      this.selectedColor = colorObj;
    }

    const $productContainer = document.createElement('div');
    const $imgContainer = document.createElement('div');
    const $productImg = document.createElement('img');
    $productImg.id = this.imgId;
    const $selectedColor = document.createElement('div');
    const $name = document.createElement('div');
    const $price = document.createElement('div');
    const $colorsContainer = document.createElement('div');

    const colorsMap = colors.map(curColor => {
      const $colorBtn = document.createElement('button');
      $colorBtn.addEventListener('click', () => {
        this.updateSelection(this.imgId, curColor);
      });
      $colorBtn.style.backgroundColor = COLOR_VALUES[curColor.toUpperCase()];
      $colorBtn.classList.add('color-btn');
      if (curColor === 'white') {
        $colorBtn.classList.add('color-btn--white');
      }
      return $colorBtn;
    });

    $colorsContainer.className = 'colors-container';
    $colorsContainer.append(...colorsMap);

    $imgContainer.append($productImg);
    $productImg.src = this.colorOptions[this.selectedColor.color];
    $productImg.alt = product_id;
    $selectedColor.id = this.selectedColor.id;
    $selectedColor.textContent = this.formatUpperCase(this.selectedColor.color);
    $name.textContent = name;

    const $priceContainer = document.createElement('div');
    $priceContainer.className = 'price-container';

    if (inventory.length > 0) {
      const { list_price, sale_price } = inventory[0];

      const $listPrice = document.createElement('div');
      $listPrice.textContent = `$${list_price}`;

      let $salePrice = null;

      if (sale_price < list_price) {
        $salePrice = document.createElement('div');
        $salePrice.textContent = `$${sale_price}`;

        $listPrice.style.textDecoration = 'line-through';
        $priceContainer.append($salePrice, $listPrice);
      } else {
        $priceContainer.append($listPrice);
      }
    }

    $name.className = 'product-container__name';
    $selectedColor.className = 'product-container__selected-color';
    $productContainer.className = 'product-container';

    $imgContainer.className = 'img-container';
    $productImg.className = 'img-container__img';

    $productContainer.tabIndex = '0';
    $productContainer.addEventListener('focus', () => {
      $productContainer.focus();
    });
    $productContainer.append(
      $imgContainer,
      $selectedColor,
      $name,
      $priceContainer,
      $colorsContainer
    );
    return $productContainer;
  }
}
