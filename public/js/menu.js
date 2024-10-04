// Fetch menu items from backend
fetch('/menu')
  .then(response => response.json())
  .then(data => {
    const menuGrid = document.getElementById('menu-grid');
    data.forEach(item => {
      const menuItem = `
        <div class="menu-item">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>Price:</strong> ${item.price}</p>
        </div>
      `;
      menuGrid.innerHTML += menuItem;
    });
  })
  .catch(error => {
    console.error('Error fetching menu items:', error);
  });
