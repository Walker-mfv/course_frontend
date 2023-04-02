import { Stack } from '@chakra-ui/react'
import { useMemo } from 'react'
import NumberFormat from 'react-number-format'
import AdminLayout from '../../../app/modules/admin/AdminLayout'
import AdminTable from '../../../app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from '../../../app/modules/admin/components/AdminTable/AdminTableToolbar'
import PageTitle from '../../../app/modules/admin/components/PageTitle'
import RowActions from '../../../app/modules/admin/components/RowAction'
import StatusBadge, { TStatus } from '../../../app/modules/admin/components/StatusBadge'
import TdAvatar from '../../../app/modules/admin/components/TdAvatar'
import Time from '../../../app/modules/admin/components/Time'
import ViewInstructor, { ViewInstructorDialog } from '../../../app/modules/admin/pages/performance/ViewInstructor'
import { AdminUrlParamsProvider, useAdminUrlParams } from '../../../app/modules/admin/providers/admin-query.provider'
import AppDialogProvider, { useAppDialog } from '../../../app/modules/admin/providers/app-dialog.provider'
import SearchProvider from '../../../app/modules/admin/providers/search.provider'
import {
  useCountInstructorsQuery,
  useInstructorsQuery,
} from '../../../app/modules/admin/queries/instructors-query.hook'
import { useRoleSelectDataQuery } from '../../../app/modules/admin/queries/role-select-data-query.hook'
import Card from '../../../app/modules/shared/components/Card'
import MyHead from '../../../app/modules/shared/components/MyHead'
import Pagination from '../../../app/modules/shared/components/Pagination/Pagination'
import Price from '../../../app/modules/shared/components/Price'
import { ITableColumn } from '../../../app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from '../../../app/modules/shared/interfaces/table-row.interface'
import { NextPageWithLayout } from '../../../app/types/next'
import AppIcon from '../../../app/utils/constants/app-icon.constant'
import AppTitle from '../../../app/utils/constants/app-title.constant'
import FieldLabel from '../../../app/utils/constants/field-label.constant'
import { USER_SEARCH_MENU } from '../../../app/utils/data/user.data'

// DATA
export const columns: ITableColumn[] = [
  {
    header: FieldLabel['user.name'],
    accessor: 'profile.fullName',
    sortable: true,
  },
  // {
  //     header: FieldLabel['user.email'],
  //     accessor: 'email',
  //     sortable: true,
  //     searchable: true,
  // },
  {
    header: FieldLabel['user.status'],
    accessor: 'status',
    sortable: true,
  },
  {
    header: 'Active course',
    accessor: 'meta.totalCourse',
    sortable: true,
  },
  {
    header: 'Total revenue',
    accessor: 'meta.totalRevenue',
    sortable: true,
  },
  {
    header: 'Total enrollment',
    accessor: 'meta.totalEnrollment',
    sortable: true,
  },
  {
    header: 'Course rating',
    accessor: 'meta.courseRating',
    sortable: true,
  },
  // {
  //     header: FieldLabel['user.role'],
  //     accessor: 'role.name',
  //     sortable: true,
  // },
  {
    header: FieldLabel['user.createdAt'],
    accessor: 'createdAt',
    sortable: true,
  },
  {
    header: FieldLabel.actions,
    accessor: 'actions',
  },
]

// PAGE CONTENT
const PageContent = () => {
  return (
    <Stack flexDir="column" spacing={10}>
      {/* MAIN TABLE*/}
      <Card>
        <Stack spacing={2} flexDir="column" alignItems={'stretch'}>
          <PageTitle title={'Instructors'} mb={{ lg: 4 }} />
          <PageTableToolbar />
          <PageTable />
        </Stack>
      </Card>
    </Stack>
  )
}

const PageTableToolbar = () => {
  const rolesSDQ = useRoleSelectDataQuery()
  //
  // const filters: FilterItemProps[] = useMemo(() => {
  //     return [
  //         {
  //             field: 'status',
  //             label: FieldLabel['user.status'],
  //             options: USER_STATUS_SELECT_DATA,
  //         },
  //         {
  //             field: 'role._id',
  //             label: FieldLabel['user.role'],
  //             options: rolesSDQ.data,
  //         },
  //     ]
  // }, [rolesSDQ.data])

  // GEN ROWS DATA
  // const form = useMemo(() => {
  //     return <UserDetailForm />
  // }, [])

  // const actions = useMemo(() => {
  //     return [
  //         <Filter key={1} data={filters} />,
  //         <ExportButton key={2} />,
  //         <MainCreateButton key={3} formComponent={form} />,
  //     ]
  // }, [filters, form])
  return <AdminTableToolbar searchMenu={USER_SEARCH_MENU} actions={undefined} />
}

const ITEMS_PER_PAGE = 10
const InstructorsPagination = () => {
  const query = useAdminUrlParams()
  const { data: totalItems = 0 } = useCountInstructorsQuery(query)
  const { _limit = ITEMS_PER_PAGE } = query
  const totalPage = totalItems > 0 ? Math.ceil(totalItems / _limit) : 0
  if (totalPage < 2) return <></>
  return (
    <Pagination
      scroll={true}
      colorScheme={'purple'}
      pagination={{
        itemsPerPage: _limit,
        pageRange: 3,
        totalItems,
        currentPage: query._page,
      }}
    />
  )
}

const PageTable = () => {
  const { onShow } = useAppDialog()
  const { isLoading, isError, data } = useInstructorsQuery()
  const rows: ITableRow[] | undefined = useMemo(() => {
    return data?.map((item) => {
      return {
        _id: item._id,
        'profile.fullName': (
          <TdAvatar
            alt={item.profile.fullName || ''}
            title={item.profile.fullName || ''}
            subtitle={item.email}
            thumbSize="md"
            thumb={item.profile.avatar || ''}
            field={'profile.fullName'}
            searchFields={['profile.fullName', 'email']}
          />
        ),
        // email: item.email,
        status: <StatusBadge status={item.status as TStatus} />,
        'meta.totalCourse': <NumberFormat displayType="text" value={item.meta.totalCourse} />,
        'meta.totalRevenue': <Price value={item.meta.totalRevenue} />,
        'meta.totalEnrollment': <NumberFormat displayType="text" value={item.meta.totalEnrollment} />,
        'meta.courseRating': <NumberFormat displayType="text" value={item.meta.courseRating} decimalScale={1} />,

        createdAt: <Time timestamp={item.createdAt} />,
        actions: (
          <RowActions
            actions={[
              {
                name: 'View',
                icon: AppIcon.view,
                onClick: () => {
                  onShow({
                    title: item.profile.fullName + ' Dashboard',
                    body: <ViewInstructor instructorId={item._id} />,
                  })
                },
              },
            ]}
          />
        ),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <Stack>
      <AdminTable
        hasMultiChange={false}
        hasPagination={false}
        isLoading={isLoading}
        isError={isError}
        columns={columns}
        rows={rows}
      />
      <InstructorsPagination />
    </Stack>
  )
}

// PROVIDERS AND DEFAULT VALUES
const InstructorsPage: NextPageWithLayout = (query: any) => {
  return (
    <>
      <MyHead title={AppTitle.ADMIN_INSTRUCTORS} />
      <AdminUrlParamsProvider
        defaultValue={{
          _sortBy: 'createdAt',
          _order: 'desc',
          _limit: 5,
          ...query,
        }}
      >
        <AppDialogProvider>
          <SearchProvider defaultField={'all'}>
            <PageContent />
            <ViewInstructorDialog />
          </SearchProvider>
        </AppDialogProvider>
      </AdminUrlParamsProvider>
    </>
  )
}
InstructorsPage.getLayout = AdminLayout
export default InstructorsPage
