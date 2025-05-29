import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUsers, useActivateUsers, useBlockUsers, useDeleteUsers } from '../api/user/userHooks';
import Sparkline from './Sparkline';
import { getActivityCountsByDay } from '../utils/activityUtils.js';


const UserTable = () => {
    const [params, setParams] = useState({
        page: 1,
        pageSize: 10,
        sort: 'lastLogin',
        order: 'desc'
    });
    const [alert, setAlert] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { data, isLoading, isError, error, refetch } = useUsers(params);
    const { register, watch } = useForm({
            defaultValues: {
            search: '',
            status: ''
            }
        });

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => setAlert(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [alert]);


    const blockUsersMutation = useBlockUsers({
        onSuccess: () => {
            setAlert({ type: 'warning', message: 'Selected users have been blocked.' });
            refetch();
            setSelectedUsers([]);
        },
        onError: () => {
            setAlert({ type: 'danger', message: 'Failed to block users.' });
        }
    });
    const activateUsersMutation = useActivateUsers({
        onSuccess: () => {
            setAlert({ type: 'primary', message: 'Selected users have been activated.' });
            refetch();
            setSelectedUsers([]);
        },
        onError: () => {
            setAlert({ type: 'danger', message: 'Failed to activate users.' });
        }
    });
    const deleteUsersMutation = useDeleteUsers({
        onSuccess: () => {
            setAlert({ type: 'danger', message: 'Selected users have been deleted.' });
            refetch();
            setSelectedUsers([]);
        },
        onError: () => {
            setAlert({ type: 'danger', message: 'Failed to delete users.' });
        }
    });

    const searchTerm = watch('search');
    const statusFilter = watch('status');

    const handleToggleUser = (userId) => {
    setSelectedUsers(prev =>
        prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
        );
    };

    const handleSelectAll = () => {
        const currentPageUserIds = data?.users?.map(user => user.id) || [];
        const allSelected = currentPageUserIds.every(id => selectedUsers.includes(id));

        setSelectedUsers(prev =>
            allSelected
            ? prev.filter(id => !currentPageUserIds.includes(id)) 
            : [...new Set([...prev, ...currentPageUserIds])] 
        );
    };

    const handleBulkBlock = () => {
        blockUsersMutation.mutate(selectedUsers);
    };

    const handleBulkActivate = () => {
     activateUsersMutation.mutate(selectedUsers);
    };

    const handleBulkDelete = () => {
      deleteUsersMutation.mutate(selectedUsers);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
        setParams(prev => ({
            ...prev,
            search: searchTerm,
            status: statusFilter,
            page: 1
        }));
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm, statusFilter]);

    const handleSort = (field) => {
        setParams(prev => ({
        ...prev,
        sort: field,
        order: prev.sort === field ? (prev.order === 'asc' ? 'desc' : 'asc') : 'desc'
        }));
    };

    const handlePageChange = (newPage) => {
        setParams(prev => ({ ...prev, page: newPage }));
    };

    if (isLoading) return <div className="text-center mt-4">Loading...</div>;
    if (isError) return <div className="alert alert-danger">{error.message}</div>;

    return (
        <div className="container mt-4">
            {alert && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
                </div>
            )}

        <div className="row mb-3 align-items-center">
            <div className="col-12 col-md-4 mb-2 mb-md-0">
            <input
                {...register('search')}
                placeholder="Search by name or email"
                className="form-control"
            />
            </div>
            <div className="col-12 col-md-4 mb-2 mb-md-0">
            <select {...register('status')} className="form-select">
                <option value="">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Blocked</option>
            </select>
            </div>
             <div className="col-12 col-md-4 d-flex justify-content-end gap-2">
                <button
                    className="btn btn-warning"
                    onClick={handleBulkBlock}
                    disabled={selectedUsers.length === 0}
                    >
                    {blockUsersMutation.isLoading ? (
                        <>
                            <span 
                                className="spinner-border spinner-border-sm" 
                                role="status" 
                                aria-hidden="true"
                            ></span>
                            Blocking...
                        </>
                    ) : (
                        <>
                            Block 
                            <i className="bi bi-lock-fill"/>
                        </>
                    )} 
                   <i className="bi bi-lock-fill"/>
                </button>
           
                <button
                    className="btn btn-primary"
                    onClick={handleBulkActivate}
                    disabled={selectedUsers.length === 0}
                    >
                      {activateUsersMutation.isLoading ? (
                        <>
                            <span 
                                className="spinner-border spinner-border-sm" 
                                role="status" 
                                aria-hidden="true"
                            ></span>
                            Activating...
                        </>
                    ) : (
                        <i className="bi bi-unlock-fill"/>
                    )}
                </button>

                 <button
                    className="btn btn-danger"
                    onClick={handleBulkDelete}
                    disabled={selectedUsers.length === 0}
                    >
                    {deleteUsersMutation.isLoading ? (
                        <>
                            <span 
                                className="spinner-border spinner-border-sm" 
                                role="status" 
                                aria-hidden="true"
                            ></span>
                            Deleting...
                        </>
                    ) : (
                        <i className="bi bi-trash-fill"/>
                    )}
                </button>
            </div>
        </div>

        <table className="table table-striped table-hover">
            <thead>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        checked={data?.users?.every(user => selectedUsers.includes(user.id))}
                        onChange={handleSelectAll}
                    />
                </th>
                <th>#</th>
                <th
                onClick={() => handleSort('name')}
                className="sortable"
                style={{ cursor: 'pointer' }}
                >
                Name {params.sort === 'name' && (params.order === 'asc' ? '↑' : '↓')}
                </th>
                <th
                onClick={() => handleSort('email')}
                className="sortable"
                style={{ cursor: 'pointer' }}
                >
                Email {params.sort === 'email' && (params.order === 'asc' ? '↑' : '↓')}
                </th>
                <th
                onClick={() => handleSort('lastLogin')}
                className="sortable"
                style={{ cursor: 'pointer' }}
                >
                Last Login {params.sort === 'lastLogin' && (params.order === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th>Sparkline</th>
            </tr>
            </thead>
            <tbody>
                {data?.users?.map((user, index) => {
                    const activityData = getActivityCountsByDay(user.activities, 7);

                    return (
                    <tr key={user.id}>
                         <td>
                            <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleToggleUser(user.id)}
                            />
                        </td>
                        <td>{(params.page - 1) * params.pageSize + index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.lastLogin).toLocaleString()}</td>
                        <td>
                        <span className={`badge bg-${user.status === 'ACTIVE' ? 'success' : 'danger'}`}>
                            {user.status}
                        </span>
                        </td>
                        <td>
                        <Sparkline data={activityData} />
                        </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center">
            <div>
            <button
                onClick={() => handlePageChange(params.page - 1)}
                disabled={params.page === 1}
                className="btn btn-outline-primary me-2"
            >
                Previous
            </button>
            <button
                onClick={() => handlePageChange(params.page + 1)}
                disabled={params.page >= data?.pagination?.totalPages}
                className="btn btn-outline-primary"
            >
                Next
            </button>
            </div>

            <div>
            <span className="me-2">
                Page {params.page} of {data?.pagination?.totalPages}
            </span>
            <select
                value={params.pageSize}
                onChange={(e) =>
                setParams(prev => ({
                    ...prev,
                    pageSize: Number(e.target.value),
                    page: 1
                }))
                }
                className="form-select d-inline w-auto"
            >
                {[5, 10, 20, 50].map(size => (
                <option key={size} value={size}>
                    {size} per page
                </option>
                ))}
            </select>
            </div>
        </div>
        </div>
    );
    };

    export default UserTable;
