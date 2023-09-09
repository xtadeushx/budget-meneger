import { useLoaderData } from 'react-router-dom';
import { instance } from '../../../api/axios.api';
import { ApiPath, TransactionApiPath } from '../../../common/enums/enums';
import { useEffect, useState } from '../../../hooks/hooks';
import { ITransactionItem, ITransactionsLoaderResponse } from '../types/types';

const useTransactionsPagination = (limit: number) => {
  const { transactions } = useLoaderData() as ITransactionsLoaderResponse;

  const [transactionsData, setTransactionsData] = useState<ITransactionItem[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const handlePagination = async () => {
      try {
        const { data } = await instance.get<ITransactionItem[]>(
          `${ApiPath.TRANSACTIONS}${TransactionApiPath.PAGINATION}?page=${currentPage}&limit=${limit}`,
        );
        if (data) setTransactionsData(data);
        setTotalPages(transactions.length / limit);
      } catch (error) {
        console.error(error);
      }
    };
    handlePagination();
  }, [totalPages, currentPage, limit]);

  return { transactionsData, setCurrentPage, totalPages };
};

export { useTransactionsPagination };
