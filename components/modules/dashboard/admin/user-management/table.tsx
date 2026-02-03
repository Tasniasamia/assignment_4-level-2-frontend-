import { updateStatus } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { userType } from '@/types';
import Image from 'next/image';
import StatusButton from './statusButton';

interface tableType {
    data: userType[];
  }
  
const UserTable = async({data}:tableType) => {
    return (
        <div className='border rounded-md'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='p-2'>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Created At</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody >
                 {data?.map((i:userType)=>{
                            return (
                                <TableRow key={i?.id}>
                                    <TableCell className='p-2'>
                                   <Image src={i?.image || '/default.jpg'} className='h-10 w-10 rounded-full' width={50} height={50} alt="profile"/>   
                                        </TableCell>
                                    <TableCell>{i?.name}</TableCell>
                                    <TableCell>{i?.email}</TableCell>
                                    <TableCell className='capitalize'>{i?.role}</TableCell>
                                    <TableCell >
                                        <StatusButton userData={i}/>
                                    </TableCell>
                                    <TableCell >{i?.emailVerified ? 'Yes':'No'}</TableCell>
                                    <TableCell >{i?.createdAt}</TableCell>

                                </TableRow>
                            )
                        })}
                   
                </TableBody>
            </Table>
        </div>
    );
};

export default UserTable;