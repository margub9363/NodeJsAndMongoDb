/*eslint-disable */

const login = (email, password) => {
  alert(email, password);
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  alert('cc');
  login(email, password);
});
