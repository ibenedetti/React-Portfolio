import React, { useEffect, useState } from 'react';

const TextAnimation = () => {
  const [text, setText] = useState(''); // State to hold the animated text

  useEffect(() => {
    const strings = ['Sound Engineer', 'Web Developer']; // Array of strings to animate
    let currentIndex = 0; // Index to keep track of the current string to resolve

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
            setText(nextOptions.partialString); // Update state with current text

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
        timeout: 100, // Decreased timeout for faster animation
        iterations: resolveString.length + 1, // Ensure enough iterations to complete animation
        characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
        resolveString,
        partialString: '',
        element: document.querySelector('[data-target-resolver]'),
      };

      resolver.resolve(options, () => {
        // Move to the next string if exists and add a delay
        currentIndex++;
        if (currentIndex < strings.length) {
          setTimeout(() => animateString(currentIndex), 1000); // 1 second delay
        }
      });
    }

    animateString(currentIndex);

    // Clean up function (optional)
    return () => {
      // Clean up if necessary
    };
  }, []); // Empty dependency array to run effect only once

  return <span data-target-resolver>{text}</span>;
};

export default TextAnimation;
