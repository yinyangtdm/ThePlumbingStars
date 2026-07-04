function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 text-brand-red" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.556L18.834 24 12 20.201 5.166 24l1.134-8.694L.6 9.75l7.732-1.732L12 .587z" />
        </svg>
      ))}
    </div>
  );
}

interface Props {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export default function ReviewCard({ name, location, text, rating }: Props) {
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="font-bold text-gray-900">
        {name}{" "}
        <span className="text-sm text-gray-500 font-normal">— {location}</span>
      </div>
      <div className="mt-1">
        <StarRating count={rating} />
      </div>
      <p className="mt-3 text-gray-700 text-sm leading-relaxed">{text}</p>
    </article>
  );
}
