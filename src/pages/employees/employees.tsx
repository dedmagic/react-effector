import { useEffect, useState } from "react";
import { useStore } from "effector-react";

import { EntityActionHandlerByEntity } from "common/types";
import { Column, Table, UnifedCard, UnifedPageTitle } from "common/components";
import { useDialog } from "common/hooks";
import { DeleteDialog } from "common/components/delete-dialog";

import { $employeesWithPositionName } from "modules/employees/store";
import { Employee, EmployeeRow } from "modules/employees/types";
import { fetchAllEmployees, removeEmployee } from "modules/employees";

export const Employees = () => {
  const viewData: EmployeeRow[] = useStore($employeesWithPositionName);

  const [currentEntity, setCurrentEntity] = useState<Employee>(new Employee());
  const [isDeleteDialogVisible, showDeleteDialog, closeDeleteDialog] =
    useDialog();

  useEffect(() => fetchAllEmployees(), []);

  const addHandler = () => {};

  const editHandler = (employee: Employee) => {};

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
