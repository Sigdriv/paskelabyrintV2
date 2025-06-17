import type { Answer } from './page';

import { useEffect, useRef } from 'react';
import { formatDatetime } from '@utils';

interface Props {
  answers: Answer[];
}

export function Answers({ answers }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [answers]);

  return (
    <div ref={scrollRef} className="mb-4 h-[30rem] overflow-y-auto">
      {answers.length === 0 && (
        <div className="flex w-full justify-center">
          <p className="text-gray-500">Ingen svar registrert</p>
        </div>
      )}

      <ul className="flex flex-col gap-4">
        {answers.map(({ answer, questionId, createdAt, submittedBy }) => (
          <li
            key={JSON.stringify({
              answer,
              questionId,
              createdAt,
              submittedBy,
            })}
            className="list-none flex items-end gap-2"
          >
            <p className="text-sm text-gray-500 mb-1">
              {parseInt(questionId) + 1 + '.'}
            </p>

            <div>
              <p className="text-xs text-gray-400">
                {formatDatetime(createdAt, 'time')}
              </p>

              <p className="text-lg font-semibold ">{answer}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
