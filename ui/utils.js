const includes = (collection, item) => collection.filter(c => c === item).length > 0;
const remove = (collection, item) => collection.filter(c => c !== item);
const dollarify = num => `$ ${num.toLocaleString()}`;
const totalSalary = players => players.reduce((total, p) => total + p.salary, 0);
const salaryOfSelected = (players, ids) => totalSalary(players.filter(p => ids.includes(p.id)));

export { includes, remove, dollarify, totalSalary, salaryOfSelected };
