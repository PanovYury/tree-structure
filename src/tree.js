export class Tree {
  /**
   * Родительский элемент дерева
   * @type {Tree}
   */
  parent;

  /**
   * @param {number} id ID элемента
   * @param {string} title заголовок элемента
   * @param {Tree[]} children дочерние элементы
   */
  constructor(id = null, title = null, children = []) {
    this.id = id;
    this.title = title;
    this.children = children;

    this.children.forEach((ch) => (ch.parent = this));
  }

  /**
   * Создание дерева из массива объектов.
   * Создается дополнительный корневой элемент с ID = null
   * @param {Array} array массив объектов
   * @returns {Tree} новое дерево
   */
  static fromArray(array) {
    return new Tree(null, null, array.map(Tree.fromObject));
  }

  /**
   * Преобразование исходного объекта в дерево
   * @param {Object} object исходный объект
   * @param {Object} object.id ID элемента
   * @param {Object} object.title заголовок элемента
   * @param {Object} object.children дочерние элементы
   * @returns {Tree} новое дерево
   */
  static fromObject({ id, title, children = [] }) {
    return new Tree(id, title, children.map(Tree.fromObject));
  }

  /**
   * Преобразование JSON в объект дерева.
   * Может принимать строку и объект,
   * автоматически выбирая стратегию преобразования
   * @param {string|String|Object} json исходный JSON
   * @returns {Tree} преобразованное дерево
   */
  static parse(json) {
    // Преобразование в объект при передачи строки
    if (typeof json === "string" || json instanceof String) {
      json = JSON.parse(json);
    }

    // Преобразование объекта в дерево в зависимости от типа
    return Array.isArray(json) ? Tree.fromArray(json) : Tree.fromObject(json);
  }

  /**
   * Перенос элемента в дереве
   * @param {Tree|number} item переносимый элемент
   * @param {Tree|number} target место назначение переноса
   * @param {"inside"|"after"|"before"} mode режим вставки
   */
  move(item, target, mode = "after") {
    // Получение элементов если переданы ID
    if (!item instanceof Tree) {
      item = this.find(item);
    }
    if (!target instanceof Tree) {
      target = this.find(target);
    }

    // Нельзя перенести элемент относительно самого себя
    if (item === target) return;

    // Определение целевых списков
    // По умолчанию вставка в корень
    const targetParent = (target.parent || this).children;

    // Определение позиции вставки
    const index = targetParent.findIndex((v) => v.id == target.id);

    // Перемещение элемента
    switch (mode) {
      case "inside":
        target.insert(item);
        break;
      case "before":
        target.parent.insert(item, index);
        break;
      case "after":
      default:
        target.parent.insert(item, index + 1);
    }
  }

  /**
   * Поиск элемента в дереве по ID
   * @param {number} itemId ID элемента
   * @returns {Tree|undefined} найденный элемент
   */
  find(itemId) {
    if (this.id === itemId) {
      return this;
    }
    for (const node of this.children) {
      if (node.id === itemId) {
        return node;
      }

      // Поиск в дочерних элементах
      const result = node.find(itemId);
      if (result) {
        return result;
      }
    }
    return undefined;
  }

  /**
   * Вставляет элемент дерева на указанную позицию
   * @param {Tree} item добавляемый элемент
   * @param {number} position позиция вставки
   */
  insert(item, position) {
    // Помещаем элемент в указанное место
    position = position ?? this.children.length;
    this.children.splice(position, 0, item);

    // Перезаписываем родителя
    if (item.parent) {
      item.parent.remove(item.id);
    }
    item.parent = this;
  }

  /**
   * Удаление элемента из дочерних.
   * Можно передать сам объект или его ID
   * @param {number|Tree} item удаляемый элемент
   */
  remove(item) {
    const itemId = item instanceof Tree ? item.id : item;
    const index = this.children.findIndex((v) => v.id === itemId);
    this.children.splice(index, 1);
  }

  /**
   * Вывод в консоль дерева в формате JSON с полями id, title и children
   */
  printJson() {
    console.log(JSON.stringify(this, ["id", "title", "children"], 2));
  }
}
