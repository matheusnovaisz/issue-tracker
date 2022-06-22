import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function TableHeadEnhanced() {
  const headCells = [
    { id: "id", label: "Id" },
    { id: "title", label: "Problema" },
    { id: "description", label: "Descrição" },
    { id: "author", label: "Autor" },
    { id: "version", label: "Versão" },
    { id: "status", label: "Status" },
    { id: "priority", label: "Prioridade" },
  ];

  const router = useRouter();

  const selectOrderBy = (id: string) => (event: React.MouseEvent<unknown>) => {
    const order =
      router.query.orderBy === id && router.query.order === "asc"
        ? "desc"
        : "asc";
    router.push({
      query: {
        ...router.query,
        order,
        orderBy: id,
      },
    });
  };

  type Direction = "asc" | "desc" | undefined;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((head) => (
          <TableCell key={head.id}>
            <TableSortLabel
              onClick={selectOrderBy(head.id)}
              active={router.query.orderBy === head.id}
              direction={
                ["asc", "desc"].includes(router.query.order as string)
                  ? (router.query.order as Direction)
                  : "asc"
              }
            >
              {head.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
