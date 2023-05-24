import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { EntityActionHandlerByEntity } from "shared/types";
import { Column, Table, UnifedCard, UnifedPageTitle } from "shared/components";
import { useDialog } from "shared/hooks";
import { DeleteDialog } from "shared/components/delete-dialog";

import {
  $employeesWithPositionName,
  Employee,
  EmployeeRow,
  createEmployee,
  fetchAllEmployees,
  removeEmployee,
  updateEmployee,
} from "modules/employees";
import { EmployeeEditDialog } from "./employee-edit-dialog";

export const Employees = () => {
  const viewData: EmployeeRow[] = useStore($employeesWithPositionName);

  const [currentEntity, setCurrentEntity] = useState<Employee>(new Employee());
  const [isEditDialogVisible, showEditDialog, closeEditDialog] = useDialog();
  const [isDeleteDialogVisible, showDeleteDialog, closeDeleteDialog] =
    useDialog();

  useEffect(() => fetchAllEmployees(), []);

  const addHandler = () => {
    setCurrentEntity({ id: 0, name: "", positionId: 0 } as Employee);
    showEditDialog();
  };

  const editHandler = (employee: Employee) => {
    setCurrentEntity(employee);
    showEditDialog();
  };

  const deleteHandler = (employee: Employee) => {
    setCurrentEntity(employee);
    showDeleteDialog();
  };

  const deleteEmployee = () => {
    closeDeleteDialog();
    if (currentEntity.id) {
      removeEmployee(currentEntity.id);
    } else {
      throw new Error("Something went wrong...");
    }
  };

  const saveEmployee = (employee: Employee) => {
    closeEditDialog();
    if (employee.id) {
      updateEmployee(employee);
      return;
    }
    createEmployee(employee);
  };

  const columns = getColumns(editHandler, deleteHandler);

  return (
    <>
      <UnifedPageTitle title="Сотрудники" />
      <UnifedCard>
        <div className="action-panel">
          <button onClick={addHandler}>
            <i className="far fa-square-plus icon-before-label"></i>
            Добавить сотрудника
          </button>
        </div>
        <Table<EmployeeRow> columns={columns} data={viewData} />
      </UnifedCard>
      <EmployeeEditDialog
        isVisible={isEditDialogVisible}
        employee={currentEntity}
        saveHandler={saveEmployee}
        closeHandler={closeEditDialog}
      />
      <DeleteDialog
        isVisible={isDeleteDialogVisible}
        closeHandler={closeDeleteDialog}
        approveHandler={deleteEmployee}
        title="Удаление сотрудника"
        message="Вы действительно хотите удалить этого сотрудника?"
      />
    </>
  );
};

function getColumns(
  editHandler: EntityActionHandlerByEntity<Employee>,
  deleteHandler: EntityActionHandlerByEntity<Employee>
) {
  const columns: Column<EmployeeRow>[] = [
    {
      key: "name",
      header: "ФИО",
      dataName: "name",
    },
    {
      key: "position",
      header: "Должность",
      dataName: "positionName",
      width: 250,
    },
    {
      key: "actions",
      header: () => (
        <div className="center">
          <i className="fa fa-gears"></i>
        </div>
      ),
      render: (row: EmployeeRow) => {
        return (
          /* eslint-disable jsx-a11y/anchor-is-valid */
          <>
            <a href="#" onClick={() => editHandler(row)} className="action">
              <i className="far fa-edit"></i>
            </a>
            <a href="#" onClick={() => deleteHandler(row)} className="action">
              <i className="far fa-trash-alt"></i>
            </a>
          </>
        );
      },
    },
  ];

  return columns;
}
