import React, { useState } from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [];

  const roleOptions = [
  { value: 'all', label: 'All Roles' },
  { value: 'sponsor', label: 'Sponsors' },
  { value: 'seller', label: 'Sellers' },
  { value: 'buyer', label: 'Buyers' },
  { value: 'investor', label: 'Investors' },
  { value: 'partner', label: 'Partners' }];


  const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' }];


  const getRoleBadgeColor = (role) => {
    const colors = {
      sponsor: 'bg-primary/10 text-primary',
      seller: 'bg-secondary/10 text-secondary',
      buyer: 'bg-accent/10 text-accent',
      investor: 'bg-warning/10 text-warning',
      partner: 'bg-success/10 text-success'
    };
    return colors?.[role] || 'bg-muted text-muted-foreground';
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      active: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      suspended: 'bg-error/10 text-error'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
    prev?.includes(userId) ?
    prev?.filter((id) => id !== userId) :
    [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers?.length === filteredUsers?.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers?.map((u) => u?.id));
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Search and Filters */}
      <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="md:col-span-1" />

          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="Filter by role" />

          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status" />

        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 &&
      <div className="bg-primary/5 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm font-medium text-foreground">
            {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
              Send Email
            </Button>
            <Button variant="outline" size="sm" iconName="Ban" iconPosition="left">
              Suspend
            </Button>
            <Button variant="destructive" size="sm" iconName="Trash2" iconPosition="left">
              Delete
            </Button>
          </div>
        </div>
      }
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-card rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-border" />

                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Activity</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers?.map((user) =>
              <tr key={user?.id} className="hover:bg-muted/30 transition-smooth">
                  <td className="px-6 py-4">
                    <input
                    type="checkbox"
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={() => handleSelectUser(user?.id)}
                    className="w-4 h-4 rounded border-border" />

                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                      src={user?.avatar}
                      alt={user?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover" />

                      <div>
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                      {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                      {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-foreground">{new Date(user.joinDate)?.toLocaleDateString('en-GB')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-muted-foreground">
                      {user?.role === 'sponsor' && `${user?.treesSponsored} trees • ${user?.totalSpent}`}
                      {user?.role === 'seller' && `${user?.projectsSubmitted} projects • ${user?.kycStatus}`}
                      {user?.role === 'buyer' && `${user?.creditsPurchased} credits • ${user?.totalSpent}`}
                      {user?.role === 'investor' && `${user?.tokensStaked} • ${user?.rewardsEarned}`}
                      {user?.role === 'partner' && `${user?.projectsMonitored} projects • ${user?.verificationRate}`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" iconName="MoreVertical">
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredUsers?.map((user) =>
        <div key={user?.id} className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <input
              type="checkbox"
              checked={selectedUsers?.includes(user?.id)}
              onChange={() => handleSelectUser(user?.id)}
              className="w-4 h-4 rounded border-border mt-1" />

              <Image
              src={user?.avatar}
              alt={user?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover" />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground truncate">{user?.name}</h4>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user?.status)}`}>
                    {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Join Date:</span>
                <span className="text-foreground font-medium">{new Date(user.joinDate)?.toLocaleDateString('en-GB')}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Activity: </span>
                <span className="text-foreground">
                  {user?.role === 'sponsor' && `${user?.treesSponsored} trees • ${user?.totalSpent}`}
                  {user?.role === 'seller' && `${user?.projectsSubmitted} projects • ${user?.kycStatus}`}
                  {user?.role === 'buyer' && `${user?.creditsPurchased} credits • ${user?.totalSpent}`}
                  {user?.role === 'investor' && `${user?.tokensStaked} • ${user?.rewardsEarned}`}
                  {user?.role === 'partner' && `${user?.projectsMonitored} projects • ${user?.verificationRate}`}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                View
              </Button>
              <Button variant="outline" size="sm" iconName="Edit" fullWidth>
                Edit
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card rounded-lg p-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers?.length} of {users?.length} users
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" iconName="ChevronLeft">
            Previous
          </Button>
          <Button variant="outline" size="sm" iconName="ChevronRight">
            Next
          </Button>
        </div>
      </div>
    </div>);

};

export default UserManagementTab;