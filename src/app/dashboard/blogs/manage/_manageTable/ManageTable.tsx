/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import type { ColumnsType, ColumnType } from "antd/es/table";

export interface DataType {
  key: string;
  title: string;
  category: string;
  author: string;
  createdAt: string;
}

type DataIndex = keyof DataType;

interface BlogsTableProps {
  blogs: DataType[];
  total: number;
  page: number;
  limit: number;
  searchText: string;
  searchedColumn: string;
  onPageChange: (page: number, pageSize?: number) => void;
  onSearchChange: (searchText: string, searchedColumn: string) => void;
  onDelete: (id: string) => void;
}

const BlogsTable = ({
  blogs,
  total,
  page,
  limit,
  searchText,
  searchedColumn,
  onPageChange,
  onSearchChange,
  onDelete,
}: BlogsTableProps) => {
  const searchInput = useRef<any>(null);

  // AntD Search Handler
  const handleSearch = (
    selectedKeys: string[],
    confirm: any,
    dataIndex: DataIndex
  ) => {
    onSearchChange(selectedKeys[0], dataIndex);
    confirm({ closeDropdown: false });
  };

  const handleReset = (clearFilters: any, confirm: any) => {
    clearFilters();
    onSearchChange("", "");
    confirm({ closeDropdown: false });
  };

  const getColumnSearchProps: any = (dataIndex: DataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div
        className="bg-white dark:bg-gray-800 border border-accent/20 dark:border-gray-700 rounded-lg shadow-lg"
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onKeyUp={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
          className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-accent placeholder:dark:text-fourth"
        />
        <div className="flex justify-center items-center w-full">
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => close()}
            className="text-accent dark:text-fourth"
          >
            Close
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        className={`dark:text-white ${filtered ? "#ffdddd" : undefined}`}
      />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open: boolean) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069" }}
          searchWords={[searchText]}
          textToHighlight={text || ""}
        />
      ) : (
        text
      ),
  });

  // Columns
  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...(getColumnSearchProps("title") as ColumnType<DataType>),
      sorter: (a, b) => a.title.localeCompare(b.title),
      align: "justify",

      className:
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-white dark:hover:bg-accent text-left w-4/12",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...(getColumnSearchProps("category") as ColumnType<DataType>),
      sorter: (a, b) => a.category.localeCompare(b.category),
      align: "center",
      className: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      ...(getColumnSearchProps("author") as ColumnType<DataType>),
      sorter: (a, b) => a.author.localeCompare(b.author),
      align: "center",
      className: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      className: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      className: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
      render: (record: any) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title="Update" color={"cyan"}>
            <Link href={`/dashboard/blogs/manage/${record.key}`}>
              <button className="bg-accent p-2 rounded-sm text-xs font-bold text-white hover:scale-110 duration-500 dark:bg-slate-700 dark:hover:bg-slate-600">
                <GrDocumentUpdate />
              </button>
            </Link>
          </Tooltip>

          <Tooltip title="Delete" color={"red"}>
            <button
              onClick={() => onDelete(record.key)}
              className="bg-red-500 p-2 rounded-sm text-xs font-bold text-white hover:scale-110 duration-500 dark:bg-red-600 dark:hover:bg-red-700"
            >
              <MdDeleteOutline />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Manage Blogs ({total})
      </h2>

      <Table<DataType>
        columns={columns}
        dataSource={blogs}
        className="
    custom-table 
    bg-white dark:bg-gray-800 
    text-gray-900 dark:text-white 
    rounded-xl border border-accent/20 dark:border-gray-700 
    shadow-md hover:shadow-lg transition-shadow duration-300 overflow-x-auto
  "
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: onPageChange,
          showSizeChanger: true,
          className:
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-t border-accent/20 dark:border-gray-700",
        }}
        scroll={{ x: true }}
        size="middle"
      />
    </div>
  );
};

export default BlogsTable;
