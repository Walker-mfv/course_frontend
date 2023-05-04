import { Stack, toast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import AdminLayout from 'app/modules/admin/AdminLayout'
import AdminHighlightSearchText from 'app/modules/admin/components/AdminHighlightSearchText'
import AdminTable from 'app/modules/admin/components/AdminTable/AdminTable'
import AdminTableToolbar from 'app/modules/admin/components/AdminTable/AdminTableToolbar'
import Filter from 'app/modules/admin/components/Filter/Filter'
import { FilterItemProps } from 'app/modules/admin/components/Filter/FilterItem'
import PageTitle from 'app/modules/admin/components/PageTitle'
import RowActions from 'app/modules/admin/components/RowAction'
import StatusBadge, { TStatus } from 'app/modules/admin/components/StatusBadge'
import Time from 'app/modules/admin/components/Time'
import MainCreateButton from 'app/modules/admin/pages/shared/MainCreateButton'
import { AdminPaginationProvider } from 'app/modules/admin/providers/admin-pagination-provider'
import { AdminUrlParamsProvider } from 'app/modules/admin/providers/admin-query.provider'
import PageParamsProvider, { usePageParams } from 'app/modules/admin/providers/page-params.provider'
import SearchProvider from 'app/modules/admin/providers/search.provider'
import Card from 'app/modules/shared/components/Card'
import MyHead from 'app/modules/shared/components/MyHead'
import { useAdminTableRows } from 'app/modules/shared/hooks/data/admin-query.hook'
import { useCrudActions } from 'app/modules/shared/hooks/data/crud-actions.hook'
import ICourse from 'app/modules/shared/interfaces/models/course.interface'
import { ITableColumn } from 'app/modules/shared/interfaces/table-column.interface'
import { ITableRow } from 'app/modules/shared/interfaces/table-row.interface'
import { CourseActionsProvider, useCourseActions } from 'app/modules/shared/providers/course-actions.provider'
import { NextPageWithLayout } from 'app/types/next'
import AppTitle from 'app/utils/constants/app-title.constant'
import { CONTROLLER, MODEL } from 'app/utils/constants/app.constant'
import FieldLabel from 'app/utils/constants/field-label.constant'
import lan from 'app/utils/constants/lan.constant'
import { COURSE_SEARCH_MENU, COURSE_STATUS_SELECT_DATA } from 'app/utils/data/course.data'
import Helper from 'app/utils/helpers/helper.helper'
import PathHelper from 'app/utils/helpers/path.helper'
import { useConvertCourseToInactive } from 'app/modules/instructor/queries/instructor-courses-query.hook'
import { useSimpleDialog } from '@admin/providers/simple-dialog.provider'
import { Text } from '@chakra-ui/react'
import { useAppToast } from '@shared/hooks/app-toast.hook'
import NotifyHelper from 'app/utils/helpers/notify.helper'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useApproveCourse, useDeactiveCourse } from '@course-form/hooks/course-query.hook'

// DATA
export const columns: ITableColumn[] = [
  {
    header: FieldLabel['course.title'],
    accessor: 'basicInfo.title',
    sortable: true,
  },
  {
    header: FieldLabel['course.status'],
    accessor: 'status',
    sortable: true,
    searchable: true,
  },
  {
    header: FieldLabel['course.createdAt'],
    accessor: 'history.createdAt',
    sortable: true,
  },
  {
    header: FieldLabel['course.updatedAt'],
    accessor: 'history.updatedAt',
    sortable: true,
  },
  {
    header: FieldLabel.actions,
    accessor: 'actions',
  },
]

// PAGE CONTENT
const PageContent = () => {
  const { modelName } = usePageParams()

  return (
    <Stack flexDir="column" spacing={10}>
      {/* MAIN TABLE*/}
      <Card>
        <Stack spacing={2} flexDir="column" alignItems={'stretch'}>
          <PageTitle title={Helper.lodash.capitalize(Helper.pluralize.plural(modelName))} mb={{ lg: 4 }} />
          <PageTableToolbar />
          <PageTable />
        </Stack>
      </Card>
    </Stack>
  )
}

const PageTableToolbar = () => {
  const { onNew } = useCourseActions()

  const filters: FilterItemProps[] = useMemo(() => {
    return [
      {
        field: 'status',
        label: FieldLabel['user.status'],
        options: COURSE_STATUS_SELECT_DATA,
      },
      // {
      //     field: 'role._id',
      //     label: FieldLabel['user.role'],
      //     options: rolesSDQ.data
      // },
    ]
  }, [])

  // GEN ROWS DATA
  const actions = useMemo(() => {
    return [
      <Filter key={1} data={filters} />,
      // <ExportButton key={2} />,
      <MainCreateButton onClick={() => onNew('admin')} key={3} />,
    ]
  }, [filters, onNew])
  return <AdminTableToolbar searchMenu={COURSE_SEARCH_MENU} actions={actions} />
}

const PageTable = () => {
  const { onShow } = useSimpleDialog()
  const router = useRouter()
  const { onDeleteOne } = useCrudActions()
  const toast = useAppToast()
  const { ctrlName, modelName } = usePageParams()
  const rowsQ = useAdminTableRows<ICourse>(ctrlName)
  const { mutate: deactiveCourse } = useDeactiveCourse()
  const { mutate: reactiveCourse } = useApproveCourse()

  const rows: ITableRow[] | undefined = useMemo(() => {
    return rowsQ.data?.map((item) => {
      const onDeactivate = () => {
        onShow({
          title: 'Confirm Deactivation',
          content: (
            <>
              <Text fontWeight={'bold'} fontSize={'lg'}>
                Do you want to deactivation this course?
              </Text>{' '}
              This means that the course is no longer visible to students, and they will not be able to enroll the
              course materials but enrolled students can still access the course.
            </>
          ),
          colorScheme: 'blue',
          onPositive: () => {
            deactiveCourse(item._id, {
              onSuccess: (_) => {
                toast(NotifyHelper.success('Course deactivated'))
              },
              onError: (_) => {
                toast(NotifyHelper.somethingWentWrong)
              },
            })
          },
        })
      }

      const onReactivate = () => {
        onShow({
          title: 'Reactive Course',
          content:
            'Once the course is reactivated, it will be live on the website. Do you want to reactive this course?',
          colorScheme: 'blue',
          onPositive: () => {
            reactiveCourse(
              { id: item._id, status: 'active' },
              {
                onSuccess: (_) => {
                  toast(NotifyHelper.success('Course reactivated'))
                },
                onError: (_) => {
                  toast(NotifyHelper.somethingWentWrong)
                },
              }
            )
          },
        })
      }

      const actions = [
        {
          name: Helper.lodash.capitalize(lan.EDIT),
          icon: FiEdit2,
          onClick: () => {
            router.push(PathHelper.getAdminCourseFormPath(item._id))
          },
        },
        {
          name: Helper.lodash.capitalize(lan.DELETE),
          icon: FiTrash,
          onClick: async () => {
            onDeleteOne(item._id, item.basicInfo.title, {
              deletionValidate: true,
            })
          },
        },
      ]

      if (item.status == 'active' || item.status == 'inactive') {
        actions.push({
          name: Helper.lodash.capitalize(item.status == 'active' ? lan.DEACTIVATE : lan.REACTIVATE),
          icon: item.status == 'active' ? IoIosRemoveCircleOutline : AiOutlineCheckCircle,
          onClick: async () => {
            if (item.status == 'active') onDeactivate()
            else onReactivate()
          },
        })
      }

      return {
        _id: item._id,
        'basicInfo.title': (
          <AdminHighlightSearchText
            value={item.basicInfo.title}
            fields={['basicInfo.title']}
            noOfLines={3}
            minW="200px"
          />
        ),
        status: <StatusBadge status={item.status as TStatus} />,
        'history.createdAt': <Time timestamp={item.history.createdAt} />,
        'history.updatedAt': item.history.updatedAt ? <Time type="long" timestamp={item.history.updatedAt} /> : null,
        actions: <RowActions actions={actions} />,
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsQ.data])
  return (
    <AdminTable
      hasMultiChange={false}
      isLoading={rowsQ.isLoading}
      isError={rowsQ.isError}
      columns={columns}
      rows={rows}
    />
  )
}

// PROVIDERS AND DEFAULT VALUES
const Index: NextPageWithLayout = (query: any) => {
  return (
    <>
      <MyHead title={AppTitle.ADMIN_COURSES} />
      <PageParamsProvider
        defaultValue={{
          ctrlName: CONTROLLER.course,
          modelName: MODEL.course,
        }}
      >
        <AdminUrlParamsProvider
          defaultValue={{
            _sortBy: 'history.createdAt',
            _order: 'desc',
            _limit: 10,
            ...query,
          }}
        >
          <AdminPaginationProvider
            params={{
              itemsPerPage: 10,
              pageRange: 3,
              totalItems: 0,
            }}
          >
            <SearchProvider defaultField={'all'}>
              <CourseActionsProvider>
                <PageContent />
              </CourseActionsProvider>
            </SearchProvider>
          </AdminPaginationProvider>
        </AdminUrlParamsProvider>
      </PageParamsProvider>
    </>
  )
}

Index.getLayout = AdminLayout
export default Index
