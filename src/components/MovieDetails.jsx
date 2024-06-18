import { useSelectedId } from "../context/SelectedMovieContext";

function MovieDetails() {
  const { selectedId, handleBtnClose } = useSelectedId();
  return (
    <div className="details">
      <button className="btn-back" onClick={handleBtnClose}>
        &larr;
      </button>
      {selectedId}
    </div>
  );
}

export default MovieDetails;
