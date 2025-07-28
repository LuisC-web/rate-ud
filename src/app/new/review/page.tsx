import RateStair from "@/components/RateStair";
import React from "react";

function newReviewPage() {
  return (
    <div className="flex h-full w-screen items-center justify-center">
      <div className="border-primary mx-auto mt-10 w-full max-w-xl rounded-xl border-2 p-5 px-10">
        <h1 className="mb-3 text-2xl">Crea una reseña</h1>
        <form className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="select-teacher">Seleccione un profesor</label>
            <select
              name="select-teacher"
              className="bg-primary-light border-primary w-full rounded-2xl border-2 px-5 py-2"
              defaultValue=""
            >
              <option value="">Seleccione un profesor</option>
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="rate-teacher">Calificacion:</label>
            <RateStair></RateStair>
          </div>{" "}
          <div className="flex flex-col space-y-2">
            <label htmlFor="review-teacher">Reseña:</label>
            <textarea
              name="review-teacher"
              id="review-teacher"
              placeholder="Escribe una reseña..."
              className="placeholder-primary-light border-primary h-40 rounded-xl border-2 p-7 md:h-64"
            ></textarea>
          </div>
          <input
            type="submit"
            className="bg-primary-light text-primary border-primary rounded-2xl border-2 p-3"
            value="Enviar reseña"
          />
        </form>
      </div>
    </div>
  );
}

export default newReviewPage;
