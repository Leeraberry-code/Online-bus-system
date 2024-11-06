'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "../../../ui/button"
import { Input } from "../../../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select"
import { Card, CardContent } from "../../../ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../ui/dialog"
import { Checkbox } from "../../../ui/checkbox"
import { Avatar } from "../../../ui/avatar"
import { Badge } from "../../../ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip"
import { LockClosedIcon, LockOpenIcon, TrashIcon, ArrowPathIcon, ArrowDownTrayIcon, EyeIcon, PencilIcon, UserIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline'

interface User {
  _id: string
  username: string
  email: string
  role: 'user' | 'administrator' | 'ngo'
  status: 'active' | 'restricted'
  createdAt: string
  updatedAt: string
}

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [currentEditUser, setCurrentEditUser] = useState<User | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' }>({ key: 'username', direction: 'asc' })
  const [exporting, setExporting] = useState(false)
  const [filters, setFilters] = useState({ role: 'all', status: 'all' })
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [viewUser, setViewUser] = useState<User | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get<{ users: User[] }>("http://localhost:5000/account/users")
      if (response.status === 200) {
        setUsers(response.data.users)
      } else {
        console.log(("userDashboard.fetchError"))
      }
    } catch (err) {
      console.log(("userDashboard.fetchError"), err)
    } finally {
      setLoading(false)
    }
  }

  const removeUser = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/account/remove`, { data: { userId: id } })
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id))
        console.log(("userDashboard.userDeleted"))
      } else {
        console.log(("userDashboard.deleteError"))
      }
    } catch (error) {
      console.log(("userDashboard.deleteError"), error)
    }
  }

  const toggleUser = async (id: string, status: 'active' | 'restricted', role: User['role']) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, status, role })
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, status, role } : user))
        console.log(("userDashboard.userUpdated"))
      } else {
        console.error(("userDashboard.updateError"))
      }
    } catch (err) {
      console.error(("userDashboard.generalError"), err)
    }
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = filteredAndSortedUsers.map((user) => user._id)
      setSelectedUsers(newSelecteds)
      return
    }
    setSelectedUsers([])
  }

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const selectedIndex = selectedUsers.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1))
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1),
      )
    }

    setSelectedUsers(newSelected)
  }

  const handleEditClick = (user: User) => {
    setCurrentEditUser(user)
    setEditDialogOpen(true)
  }

  const handleEditSave = async () => {
    if (!currentEditUser) return

    try {
      const { _id, username, email, role, status } = currentEditUser
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: _id, username, email, role, status })
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === _id ? { ...user, username, email, role, status } : user))
        console.log(("userDashboard.userUpdated"))
        setEditDialogOpen(false)
        setCurrentEditUser(null)
      } else {
        console.log(("userDashboard.updateError"))
      }
    } catch (err) {
      console.log(("userDashboard.generalError"), err)
    }
  }

  const handleSort = (key: keyof User) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users]
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableUsers
  }, [users, sortConfig])

  const filteredAndSortedUsers = React.useMemo(() => {
    return sortedUsers.filter(user => {
      const matchesSearch = (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesRole = filters.role === 'all' || user.role === filters.role
      const matchesStatus = filters.status === 'all' || user.status === filters.status
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [sortedUsers, searchQuery, filters])

  const handleExport = async () => {
    setExporting(true)
    try {
      const response = await axios.get("http://localhost:5000/account/users", { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'users.csv')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      console.log(("users.exportSuccess"))
    } catch (err) {
      console.log(("users.exportError"), err)
    } finally {
      setExporting(false)
    }
  }

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleViewClick = (user: User) => {
    setViewUser(user)
    setViewDialogOpen(true)
  }

  const handlePageChange = (value: number) => {
    setCurrentPage(value)
  }

  const paginatedUsers = React.useMemo(() => {
    const start = (currentPage - 1) * usersPerPage
    return filteredAndSortedUsers.slice(start, start + usersPerPage)
  }, [filteredAndSortedUsers, currentPage])

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage)

  const getRoleIcon = (role: User['role']) => {
    switch (role) {
      case 'administrator':
        return <ShieldCheckIcon className="w-5 h-5" />
      case 'ngo':
        return <HeartIcon className="w-5 h-5" />
      default:
        return <UserIcon className="w-5 h-5" />
    }
  }

  const isSelected = (id: string) => selectedUsers.indexOf(id) !== -1

  return (
    <div className="min-h-screen flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 flex items-center justify-center">
          <UserIcon className="mr-2 h-8 w-8 md:h-10 md:w-10 animate-bounce" />
          {("userDashboard.title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="text-center p-6">
              <h2 className="text-xl font-semibold text-white mb-2">{("userDashboard.activeUsers")}</h2>
              <p className="text-3xl font-bold text-white">{users.filter(user => user.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="text-center p-6">
              <h2 className="text-xl font-semibold text-white mb-2">{("userDashboard.restrictedUsers")}</h2>
              <p className="text-3xl font-bold text-white">{users.filter(user => user.status === 'restricted').length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="text-center p-6">
              <h2 className="text-xl font-semibold text-white mb-2">{("userDashboard.totalUsers")}</h2>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{("userDashboard.searchUsers")}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={fetchUsers}>
                  <ArrowPathIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{("userDashboard.refreshUsers")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <Select
            onValueChange={(value) => handleFilterChange('role', value)}
            defaultValue={filters.role}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={("userDashboard.role")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{("userDashboard.all")}</SelectItem>
              <SelectItem value="user">{("userDashboard.user")}</SelectItem>
              <SelectItem value="administrator">{("userDashboard.admin")}</SelectItem>
              <SelectItem value="ngo">{("userDashboard.ngo")}</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => handleFilterChange('status', value)}
            defaultValue={filters.status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={("userDashboard.status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{("userDashboard.all")}</SelectItem>
              <SelectItem value="active">{("userDashboard.active")}</SelectItem>
              <SelectItem value="restricted">{("userDashboard.restricted")}</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder={("userDashboard.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
          />
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={exporting}
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            {exporting ?("userDashboard.exporting") : ("userDashboard.exportCSV")}
          </Button>
        </div>
      </Card>

      <Card className="flex-grow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{('title')}</h2>
            {selectedUsers.length > 0 && (
              <div  className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          selectedUsers.forEach(id => removeUser(id))
                          setSelectedUsers([])
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{('deleteSelected')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          selectedUsers.forEach(id => toggleUser(id, 'restricted', 'user'))
                          setSelectedUsers([])
                        }}
                      >
                        <LockClosedIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{('lockSelected')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          selectedUsers.forEach(id => toggleUser(id, 'active', 'user'))
                          setSelectedUsers([])
                        }}
                      >
                        <LockOpenIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{('unlockSelected')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers(paginatedUsers.map(user => user._id))
                            } else {
                              setSelectedUsers([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('username')}>
                          {('username')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('email')}>
                          {('email')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('role')}>
                          {('role')}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" onClick={() => handleSort('status')}>
                          {('status')}
                        </Button>
                      </TableHead>
                      <TableHead>{('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.length > 0 ? (
                      paginatedUsers.map((user) => {
                        const isItemSelected = isSelected(user._id)
                        return (
                          <TableRow key={user._id} data-state={isItemSelected ? "selected" : undefined}>
                            <TableCell>
                              <Checkbox
                                checked={isItemSelected}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedUsers([...selectedUsers, user._id])
                                  } else {
                                    setSelectedUsers(selectedUsers.filter(id => id !== user._id))
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Avatar className="mr-2 h-8 w-8 bg-primary text-primary-foreground">
                                  {user.username[0].toUpperCase()}
                                </Avatar>
                                {user.username}
                              </div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {getRoleIcon(user.role)}
                                <Select
                                  value={user.role}
                                  onValueChange={(value: User['role']) => toggleUser(user._id, user.status, value)}
                                >
                                  <SelectTrigger className="w-[120px] ml-2">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">{('user')}</SelectItem>
                                    <SelectItem value="administrator">{('admin')}</SelectItem>
                                    <SelectItem value="ngo">{('ngo')}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleViewClick(user)}>
                                        <EyeIcon className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{('viewUserDetails')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="icon" onClick={() => handleEditClick(user)}>
                                        <PencilIcon className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{('editUser')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <Button
                                  variant={user.status === 'active' ? 'default' : 'secondary'}
                                  size="sm"
                                  onClick={() => toggleUser(user._id, user.status === 'active' ? 'restricted' : 'active', user.role)}
                                >
                                  {user.status === 'active' ? <LockClosedIcon className="h-4 w-4" /> : <LockOpenIcon className="h-4 w-4" />}
                                  {user.status === 'active' ? ('lock') : ('unlock')}
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeUser(user._id)}
                                >
                                  <TrashIcon className="h-4 w-4" />
                                  {('delete')}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">{('noUsersFound')}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-center space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {('previous')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {('next')}
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{('editUser')}</DialogTitle>
          </DialogHeader>
          {currentEditUser && (
            <div className="space-y-4">
              <Input
                placeholder={('username')}
                value={currentEditUser.username}
                onChange={(e) => setCurrentEditUser({ ...currentEditUser, username: e.target.value })}
              />
              <Input
                placeholder={('email')}
                value={currentEditUser.email}
                onChange={(e) => setCurrentEditUser({ ...currentEditUser, email: e.target.value })}
              />
              <Select
                value={currentEditUser.role}
                onValueChange={(value: User['role']) => setCurrentEditUser({ ...currentEditUser, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={('role')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">{('user')}</SelectItem>
                  <SelectItem value="administrator">{('admin')}</SelectItem>
                  <SelectItem value="ngo">{('ngo')}</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={currentEditUser.status}
                onValueChange={(value: 'active' | 'restricted') => setCurrentEditUser({ ...currentEditUser, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={('status')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{('active')}</SelectItem>
                  <SelectItem value="restricted">{('restricted')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>{('cancel')}</Button>
            <Button onClick={handleEditSave}>{('save')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{('viewUserDetails')}</DialogTitle>
          </DialogHeader>
          {viewUser && (
            <div className="space-y-4">
              <p><strong>{('username')}:</strong> {viewUser.username}</p>
              <p><strong>{('email')}:</strong> {viewUser.email}</p>
              <p><strong>{('role')}:</strong> {viewUser.role}</p>
              <p><strong>{('status')}:</strong> {viewUser.status}</p>
              <p><strong>{('createdAt')}:</strong> {new Date(viewUser.createdAt).toLocaleString()}</p>
              <p><strong>{('lastUpdated')}:</strong> {new Date(viewUser.updatedAt).toLocaleString()}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewDialogOpen(false)}>{('close')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}