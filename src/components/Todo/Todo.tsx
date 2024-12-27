import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todo: Todo;
  selectedTodo: Todo | null;
  showSelectedTodo: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = props => {
  const { todo, showSelectedTodo, selectedTodo } = props;

  return (
    <tr data-cy="todo" className="">
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>
      <td className="is-vcentered is-expanded">
        <p
          className={classNames({
            'has-text-success': todo.completed,
            'has-text-danger': !todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>
      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => showSelectedTodo(todo)}
        >
          <span className="icon">
            <i
              className={classNames({
                'far fa-eye-slash': todo.id === selectedTodo?.id,
                'far fa-eye': todo.id !== selectedTodo?.id,
              })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
