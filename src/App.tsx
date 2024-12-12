/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [filteredField, setFilteredField] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const preparedTodos = todos.filter(todo => {
    if (filteredField === 'completed') {
      return todo.completed === true;
    }

    if (filteredField === 'active') {
      return todo.completed === false;
    }

    return true;
  });

  const filteredTodos = preparedTodos.filter(todo => {
    if (query) {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    }

    return true;
  });

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handelTodo = (todo: Todo) => {
    setLoading(true);
    setSelectedTodo(todo);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  };

  const handleChangeStatus = (newStatus: string) => {
    setFilteredField(newStatus);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onReset = () => {
    setQuery('');
    setFilteredField('All');
    setSelectedTodo(null);
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatus={handleChangeStatus}
                query={query}
                onChangeQuery={handleChangeQuery}
                onReset={onReset}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                showSelectedTodo={handelTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          loading={loading}
          onReset={onReset}
        />
      )}
    </>
  );
};
