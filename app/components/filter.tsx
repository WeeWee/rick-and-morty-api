import { Form } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";

export const Filter = ({ name }: { name: string }) => {
	const [showModal, setModal] = useState<boolean>(false);
	const handleClick = () => {
		setModal((prev) => !prev);
		modalRef.current?.focus();
	};
	const modalRef = useRef<HTMLFormElement>(null);
	const closeModal = () => setModal(false);
	const insideForm = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			closeModal();
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", insideForm);
		document.addEventListener("scroll", closeModal);
		document.addEventListener("touchstart", insideForm);
		return () => {
			document.removeEventListener("touchstart", insideForm);
			document.removeEventListener("scroll", closeModal);
			document.removeEventListener("drag", insideForm);
		};
	}, [showModal]);
	return (
		<div className="filter-component">
			<button onClick={handleClick} className={"filter-button"}>
				Filter
			</button>
			<section ref={modalRef} className={showModal ? "filter-menu" : "hidden"}>
				<Form method="get" onSubmit={closeModal}>
					<input hidden readOnly value={1} name="page" />
					<input hidden readOnly value={name} name="name" />
					<section>
						<label htmlFor="status">Status</label>
						<select name="status" id="">
							<option value="alive">Alive</option>
							<option value="dead">Dead</option>
							<option value="unknown">Unknown</option>
						</select>
					</section>
					<section>
						<label htmlFor="gender">Gender</label>
						<select name="gender" id="">
							<option value="female">Female</option>
							<option value="male">Male</option>
							<option value="genderless">Genderless</option>
							<option value="unknown">Unknown</option>
						</select>
					</section>
					<section>
						<label htmlFor="species">Species</label>
						<select name="species" id="">
							<option value="human">Human</option>
							<option value="humanoid">Humanoid</option>
							<option value="animal">Animal</option>
							<option value="robot">Robot</option>
							<option value="unknown">Unknown</option>
						</select>
					</section>
					<section className="clear-filters">
						<input form="clear-filters" hidden readOnly value={1} name="page" />
						<input
							form="clear-filters"
							hidden
							readOnly
							value={name}
							name="name"
						/>
						<button form="clear-filters" type="submit">
							Clear filters
						</button>
						<button type="submit" className="apply-filters">
							Apply filters
						</button>
					</section>
				</Form>

				<Form id="clear-filters" method="get"></Form>
			</section>
		</div>
	);
};
