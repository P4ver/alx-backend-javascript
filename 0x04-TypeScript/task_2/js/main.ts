interface DirectorInterface {
  workFromHome: () => string;
  getCoffeeBreak: () => string;
  workDirectorTasks: () => string;
}

interface TeacherInterface {
  workFromHome: () => string;
  getCoffeeBreak: () => string;
  workTeacherTasks: () => string;
}

class Director implements DirectorInterface {
  workFromHome = () => 'Working from home';
  getCoffeeBreak = () => 'Getting a coffee break';
  workDirectorTasks = () => 'Getting to director tasks';
}

class Teacher implements TeacherInterface {
  workFromHome = () => 'Cannot from home';
  getCoffeeBreak = () => 'Cannot have a break';
  workTeacherTasks = () => 'Getting to work';
}

function createEmployee(salary: number | string): Teacher | Director {
  return isNaN(Number(salary)) && salary > 500 ? new Director() : new Teacher();
}

function isDirector(employee: Director | Teacher): employee is Director {
  return (employee as Director).workDirectorTasks !== undefined;
}

function executeWork(employee: Director | Teacher): string {
  return isDirector(employee)
    ? (employee as Director).workDirectorTasks()
    : (employee as Teacher).workTeacherTasks();
}

type Subjects = "Math" | "History";

function teachClass(todayClass:Subjects): string {
    return `Teaching ${todayClass}`;
}


console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee('$500'));

console.log(executeWork(createEmployee(200)))
console.log(executeWork(createEmployee(1000)))

console.log(teachClass('Math'));
console.log(teachClass('History'));
