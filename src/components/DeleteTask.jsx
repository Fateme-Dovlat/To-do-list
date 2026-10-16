
function DeleteTask({ onDelete }) {
  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={onDelete}
    >
      Delete
    </button>
  );
}

export default DeleteTask;