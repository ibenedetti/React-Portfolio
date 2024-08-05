import { useEffect, useState } from 'react';

const TextAnimation = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const strings = ['Sound Engineer', 'Web Developer']; 
    let currentIndex = 0; 

    const resolver = {
      resolve: function resolve(options, callback) {
        const characters = options.characters;
        const timeout = options.timeout;
        const element = options.element;
        const partialString = options.partialString;
        let iterations = options.iterations;

        setTimeout(() => {
          if (iterations > 0) {
            const nextOptions = {
              ...options,
              iterations: iterations - 1,
              partialString:
                iterations === 1 ? options.resolveString : partialString + randomCharacter(characters),
            };

            element.textContent = nextOptions.partialString;
            setText(nextOptions.partialString); 

            resolver.resolve(nextOptions, callback);
          } else if (typeof callback === 'function') {
            callback();
          }
        }, timeout);
      },
    };

    function randomCharacter(characters) {
      return characters[Math.floor(Math.random() * characters.length)];
    }

    function animateString(index) {
      const resolveString = strings[index];
      const options = {
        timeout: 100, 
        iterations: resolveString.length + 1, 
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        resolveString,
        partialString: '',
        element: document.querySelector('[data-target-resolver]'),
      };

      resolver.resolve(options, () => {
        currentIndex++;
        if (currentIndex < strings.length) {
          setTimeout(() => animateString(currentIndex), 1000); 
        }
      });
    }

    animateString(currentIndex);

    return () => {
    };
  }, []); 

  return <span data-target-resolver>{text}</span>;
};

export default TextAnimation;
