class View{
    constructor(){
        this.button = this.getElement('#boutton'); 
    }

    getElement(selector) {
        const element = document.querySelector(selector);
    
        return element;
      }

      bindAddToken(handler) {
        this.button.addEventListener('click', event => {
          event.preventDefault();
          handler(2);
        })
      }
}