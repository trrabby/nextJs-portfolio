/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tooltip } from "antd";
import Highlighter from "react-highlight-words";
import { IBlog } from "@/constants";
import { getBlogs } from "@/services/Blogs";
import { formatDate } from "@/utils/DateFormat";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import type { ColumnsType, ColumnType } from "antd/es/table";

type DataIndex = keyof DataType;

interface DataType {
  key: string;
  title: string;
  category: string;
  author: string;
  createdAt: string;
}

const Page = () => {
  const user = useAppSelector(selectCurrentUser);

  const [blogs, setBlogs] = useState<DataType[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // AntD search states
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<any>(null);

  useEffect(() => {
    if (!user) return;

    const fetchBlogs = async () => {
      const query = user.role === "admin" ? {} : { author: user._id };

      const res = await getBlogs(String(page), String(limit), query);

      const mapped = (res?.data?.result || []).map((b: IBlog) => ({
        key: b._id!,
        title: b.title,
        category: b.category,
        author: typeof b.author === "string" ? b.author : b.author?.name,
        createdAt: formatDate(b.createdAt),
      }));

      setBlogs(mapped);
      setTotal(res?.data?.meta?.total || 0);
    };

    fetchBlogs();
  }, [user, page, limit]);

  // AntD Search Handler
  const handleSearch = (
    selectedKeys: string[],
    confirm: any,
    dataIndex: DataIndex
  ) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    confirm({ closeDropdown: false }); // keeps dropdown open
  };

  const handleReset = (clearFilters: any, confirm: any) => {
    clearFilters();
    setSearchText("");
    confirm({ closeDropdown: false }); // stays open after reset
  };

  const getColumnSearchProps = (dataIndex: DataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
        />
        <Space>
          <Button
            className="bg-transparent border border-accent text-primary dark:text-fourth hover:bg-accent"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
          >
            Reset
          </Button>

          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
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

  //   Delete
  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        toast.loading("Deleting...", { id: "delete" });

        try {
          console.log(id);
          // call your deleteBlog API here
          toast.success("Deleted", { id: "delete" });
        } catch {
          toast.error("Failed", { id: "delete" });
        }
      }
    });
  };

  // Columns
  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...(getColumnSearchProps("title") as ColumnType<DataType>),
      sorter: (a, b) => a.title.localeCompare(b.title),
      className: "bg-transparent",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...(getColumnSearchProps("category") as ColumnType<DataType>),
      sorter: (a, b) => a.category.localeCompare(b.category),
      align: "center",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      ...(getColumnSearchProps("author") as ColumnType<DataType>),
      sorter: (a, b) => a.author.localeCompare(b.author),
      align: "center",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (record: any) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title="Update" color={"cyan"}>
            <Link href={`/dashboard/updateBlog/${record.key}`}>
              <button className="bg-accent p-2 rounded-sm text-xs font-bold text-white hover:scale-110 duration-500">
                <GrDocumentUpdate />
              </button>
            </Link>
          </Tooltip>

          <Tooltip title="Delete" color={"red"}>
            <button
              onClick={() => deleteHandler(record.key)}
              className="bg-red-500 p-2 rounded-sm text-xs font-bold text-white hover:scale-110 duration-500"
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
      <h2 className="text-xl font-bold mb-4">Manage Blogs ({total})</h2>

      <Table<DataType>
        columns={columns}
        dataSource={blogs}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: (p, l) => {
            setPage(p);
            setLimit(l);
          },
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default Page;
