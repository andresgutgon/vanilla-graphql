function fetchIngredients () {
  return window
    .fetch(
      'http://api-dev.reciperi.com/graphql',
      {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ ingredients { name } }' })
      }
    )
      .then((response)=> response.json());
}

function errorFetching (response) {
  var element = document.createElement('p')
  element.innerHTML = 'Could not contact API.'
  console.error("Fetch Error", response);
  document.body.appendChild(element);
}

function displayIngredients (result) {
  var element;
  if (result.errors) {
    var element = document.createElement('p')
    element.innerHTML = 'Could not retrieve ingredients.'
    console.error("GraphQL Errors", result.errors)
  } else if (result.data.menuItems) {
    var element = document.createElement('ul');
    result.data.ingredients.forEach(function(ingredient) {
      var $ingredient = document.createElement('li');
      $ingredient.innerHTML = ingredient.name;
      element.appendChild($ingredient);
    })
  }
  document.body.appendChild(element);
}

document.addEventListener('DOMContentLoaded', function () {
  fetchIngredients()
    .then(displayIngredients)
    .catch(errorFetching)
})

