/*
 * Wire
 * Copyright (C) 2018 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

import {CRUDEngine} from '../engine';

const TABLE_NAME = 'the-simpsons';

export default {
  'deletes all records from a database table.': (done: DoneFn, engine: CRUDEngine) => {
    const homer = {
      entity: {
        firstName: 'Homer',
        lastName: 'Simpson',
      },
      primaryKey: 'homer-simpson',
    };

    const lisa = {
      entity: {
        firstName: 'Lisa',
        lastName: 'Simpson',
      },
      primaryKey: 'lisa-simpson',
    };

    const marge = {
      entity: {
        firstName: 'Marge',
        lastName: 'Simpson',
      },
      primaryKey: 'marge-simpson',
    };

    Promise.all([
      engine.create(TABLE_NAME, homer.primaryKey, homer.entity),
      engine.create(TABLE_NAME, lisa.primaryKey, lisa.entity),
      engine.create(TABLE_NAME, marge.primaryKey, marge.entity),
    ])
      .then(() => engine.deleteAll(TABLE_NAME))
      .then(hasBeenDeleted => {
        expect(hasBeenDeleted).toBe(true);
        return engine.readAllPrimaryKeys(TABLE_NAME);
      })
      .then(primaryKeys => {
        expect(primaryKeys.length).toBe(0);
        done();
      })
      .catch(error => done.fail(error));
  },
};